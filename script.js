document.getElementById('imageUpload').addEventListener('change', async (event) => {
    // 사용자가 선택한 이미지 읽기
    const file = event.target.files[0];
    const imgElement = document.createElement('img');
    imgElement.src = URL.createObjectURL(file);
    document.body.appendChild(imgElement);

    // 이미지가 로드되면 모델을 불러오고 예측 실행
    imgElement.onload = async () => {
        const model = await mobilenet.load();
        const predictions = await model.classify(imgElement);
        displayPredictions(predictions);
    };
});

function displayPredictions(predictions) {
    const predictionElement = document.getElementById('prediction');
    predictionElement.innerHTML = '';
    predictions.forEach((prediction) => {
        const p = document.createElement('p');
        p.innerText = `${prediction.className}: ${prediction.probability.toFixed(6)}`;
        predictionElement.appendChild(p);
    });
}
