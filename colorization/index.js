
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
    const model = await tf.loadModel(url);
    status('Done loading pretrained model.');
    disableLoadModelButtons();
    return model;
  } catch (err) {
    console.error(err);
    status('Loading pretrained model failed.');
  }
};
