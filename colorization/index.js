const HOSTED_URLS = {
  model:'model_js/model.json'
};

function status(statusText) {
  console.log(statusText);
  document.getElementById('status').textContent = statusText;
}

function setImageFiled(img,predict) {
  const imgField = document.getElementById('test-img');
  imgField.value = img;
  doPredict(predict);
}

function setPredictFunction(predict) {
  const imgField = document.getElementById('test-img');
  imgField.addEventListener('input', () => doPredict(predict));
}

function disableLoadModelButtons() {
  document.getElementById('load-model').style.display = 'none';
}

function doPredict(predict) {
  const imgField = document.getElementById('test-img');
  const result = predict(imgField.value);
  console.log(result);
  status('Completed!');
}

async function urlExists(url) {
  status('Testing url ' + url);
  try {
    const response = await fetch(url, {method: 'HEAD'});
    return response.ok;
  } catch (err) {
    return false;
  }
}

async function loadHostedPretrainedModel(url) {
  status('Loading pretrained model from ' + url);
  try {
    const model = await tf.loadLayersModel(url);
    status('Done loading pretrained model.');
    disableLoadModelButtons();
    return model;
  } catch (err) {
    //console.error(err);
    //status('Loading pretrained model failed.');
    status(console.error(err));
  }
}


class Colorize {

  async init(urls) {
    this.urls = urls;
    this.model = await loadHostedPretrainedModel(urls.model);
    return this;
  }

  predict(img) {
    const inputImage = img;
    inputImage.width = 256;
    inputImage.height = 256;
    const predictOut = this.model.predict(inputImage);
    console.log(predictOut);

    status('Running inference');
    //const beginMs = performance.now();

    //predictOut.dispose();
    //const endMs = performance.now();

    return predictOut;
  }
};

async function setup() {
  if (await urlExists(HOSTED_URLS.model)) {
    status('Model available: ' + HOSTED_URLS.model);
    const button = document.getElementById('load-model');
    button.addEventListener('click', async () => {
      const predictor = await new Colorize().init(HOSTED_URLS);
    });
    button.style.display = 'inline-block';
  }

  status('Standing by.');
}

setup();
