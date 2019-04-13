# Text Classification in Browser

This is a demo of text classification on text books from [Project Gutenberg](https://www.gutenberg.org/). 

In this assignment, I chose three of my favorite books (`Pride and Prejudice, Anna Karenina and Jane Eyre`). And then I extracted 1000 sentences from each book to be my training set. Moreover, in order to test the performance of model, I also randomly chose 100 sentences from each book to be my test set. 

A simple model(Embedding+Dense) and LSTM were trained. The results show that our advanced model(LSTM) does not overfit too badly as the simple model. And compared with the simple model, **it increases the test accuracy by 6% and reduces the test loss by 10%**. 

[Click and Try me!](https://hongyu-li.github.io/hw4/)
