async function iniciarCamera() {
    const video = document.querySelector('#video');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = stream;

    } catch (error) {
        console.error('Erro ao acessar a câmera:', error);
        alert('Você precisa permitir o uso da câmera.');
    }
}

document.querySelector('#btn-foto').addEventListener('click', () => {

    const video = document.querySelector('#video');
    const canvas = document.querySelector('#canvas');
    const foto = document.querySelector('#foto-resultado');
    const campoNome = document.querySelector('#nome-aluno');

    const nomeAluno = campoNome.value;

    if (nomeAluno === '') {
        alert('Digite o nome do aluno antes de tirar a foto.');
        return;
    }

    if (!video.srcObject) {
        alert('A câmera está desligada.');
        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');

    context.filter = 'grayscale(1)';

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    context.filter = 'none';

    const dataHora = new Date().toLocaleString('pt-BR');

    context.fillStyle = 'rgba(0, 0, 0, 0.6)';
    context.fillRect(
        0,
        canvas.height - 90,
        canvas.width,
        90
    );

    context.fillStyle = 'white';
    context.font = '24px Arial';

    context.fillText(
        `Aluno: ${nomeAluno}`,
        20,
        canvas.height - 50
    );

    context.fillText(
        `Captura: ${dataHora}`,
        20,
        canvas.height - 20
    );

    const data = canvas.toDataURL('image/png');
    foto.src = data;
    foto.style.display = 'block';
});

document.querySelector('#btn-desligar').addEventListener('click', () => {

    const video = document.querySelector('#video');

    if (video.srcObject) {

        const tracks = video.srcObject.getTracks();

        tracks.forEach((track) => {
            track.stop();
        });

        video.srcObject = null;

        alert('Câmera desligada.');
    }
});

iniciarCamera();