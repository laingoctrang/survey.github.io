document.addEventListener('DOMContentLoaded', function () {
    var questionsDiv = document.getElementById('questionsContainer');
    questionsDiv.style.display = 'none';

    // Nhóm câu hỏi 1
    fetch('questions1.txt')
        .then(response => response.text())
        .then(text => {
            const questions = text.split(/\r?\n/); // Tách mỗi dòng thành một câu hỏi
            const container = document.getElementById('questions1');
            questions.forEach((question, index) => {
                // Tạo thẻ div cho mỗi câu hỏi để nhóm câu hỏi và các lựa chọn
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');



                // Tạo và thêm câu hỏi
                const p = document.createElement('p'); // Tạo thẻ p cho mỗi câu hỏi
                p.textContent = `${index + 1}. ${question}`; // Đặt nội dung của thẻ p là câu hỏi với số thứ tự
                questionDiv.appendChild(p); // Thêm thẻ p vào div của câu hỏi

                const trueInput = document.createElement('input');
                trueInput.setAttribute('type', 'radio');
                trueInput.setAttribute('name', `question${index}`);
                trueInput.setAttribute('value', 'True');
                trueInput.id = `question${index}True`;

                const trueLabel = document.createElement('label');
                trueLabel.setAttribute('for', trueInput.id);
                trueLabel.textContent = 'Đúng';

                const falseInput = document.createElement('input');
                falseInput.setAttribute('type', 'radio');
                falseInput.setAttribute('name', `question${index}`);
                falseInput.setAttribute('value', 'False');
                falseInput.id = `question${index}False`;

                const falseLabel = document.createElement('label');
                falseLabel.setAttribute('for', falseInput.id);
                falseLabel.textContent = 'Sai';

                // Thêm các lựa chọn vào div của câu hỏi
                questionDiv.appendChild(trueInput);
                questionDiv.appendChild(trueLabel);
                questionDiv.appendChild(falseInput);
                questionDiv.appendChild(falseLabel);

                // Thêm div câu hỏi vào container
                container.appendChild(questionDiv);
            });
        })
        .catch(error => console.error('Error loading questions:', error));

    // Nhóm câu hỏi 2
    fetch('questions2.txt')
        .then(response => response.text())
        .then(text => {
            const lines = text.split(/\r?\n/); // Tách mỗi dòng
            const container = document.getElementById('questions2');

            // Xử lý mỗi nhóm 5 dòng (1 câu hỏi + 4 phương án)
            for (let i = 0; i < lines.length; i += 5) {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');

                // Câu hỏi
                const p = document.createElement('p');
                p.textContent = `${i / 5 + 1}. ${lines[i]}`;
                questionDiv.appendChild(p);

                // 4 phương án trả lời
                for (let j = 1; j <= 4; j++) {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'radio');
                    input.setAttribute('name', `question${i / 5}`);
                    input.setAttribute('value', `Option${j}`);
                    input.id = `question${i / 5}Option${j}`;

                    const label = document.createElement('label');
                    label.setAttribute('for', input.id);
                    label.textContent = lines[i + j];

                    questionDiv.appendChild(input);
                    questionDiv.appendChild(label);

                    // Tạo khoảng cách giữa các phương án
                    questionDiv.appendChild(document.createElement('br'));
                }

                container.appendChild(questionDiv);
            }
        })
        .catch(error => console.error('Error loading questions:', error));

    // Nhóm câu hỏi 3
    fetch('questions3.txt')
        .then(response => response.text())
        .then(text => {
            const lines = text.split(/\r?\n/); // Tách mỗi dòng
            const container = document.getElementById('questions3');

            // Xử lý mỗi nhóm 5 dòng
            for (let i = 0; i < lines.length; i += 5) {
                const question = lines[i];
                const options = lines.slice(i + 1, i + 5);

                // Gọi hàm để thêm câu hỏi và các phương án vào HTML
                addQuestionWithOptions(container, question, options, i / 5);
            }
        })
        .catch(error => console.error('Error loading questions:', error));

    // Nhóm câu hỏi 4
    fetch('questions4.txt')
        .then(response => response.text())
        .then(text => {
            const questions = text.split(/\r?\n/); // Tách mỗi dòng thành một câu hỏi
            const container = document.getElementById('questions4');
            questions.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');

                // Tạo và thêm câu hỏi
                const p = document.createElement('p');
                p.textContent = `${index + 1}. ${question}`;
                questionDiv.appendChild(p);

                // Tạo ô input cho người dùng nhập câu trả lời
                const input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('name', `answer${index}`);
                input.id = `answer${index}`;

                // Thêm ô input vào div câu hỏi
                questionDiv.appendChild(input);

                // Thêm div câu hỏi vào container
                container.appendChild(questionDiv);
            });
        })
        .catch(error => console.error('Error loading questions:', error));
});

function addQuestionWithOptions(container, question, options, questionNumber) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const p = document.createElement('p');
    p.textContent = `${questionNumber + 1}. ${question}`;
    questionDiv.appendChild(p);

    options.forEach((option, index) => {
        const optionContainer = document.createElement('div');
        optionContainer.classList.add('optionContainer');
        questionDiv.appendChild(optionContainer);

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', `question${questionNumber}option${index}`);
        checkbox.id = `question${questionNumber}option${index}`;

        const label = document.createElement('label');
        label.setAttribute('for', checkbox.id);
        label.textContent = option;

        optionContainer.appendChild(checkbox);
        optionContainer.appendChild(label);
    });

    container.appendChild(questionDiv);
}

function checkInfo() {
    var fullName = document.getElementById('fullName').value.trim();
    var birthDate = document.getElementById('birthDate').value.trim();
    var cccd = document.getElementById('cccd').value.trim();
    var address = document.getElementById('address').value.trim();

    // Kiểm tra xem có trường nào bị trống không
    if (!fullName || !birthDate || !cccd || !address) {
        // Nếu có, hiển thị thông báo và ngăn chặn việc chuyển tiếp sang phần khảo sát
        alert('Vui lòng điền đầy đủ thông tin trước khi bắt đầu khảo sát.');
        return; // Dừng hàm
    }

    showQuestions();
}

function showQuestions() {
    // Ẩn form thông tin
    document.getElementById('userForm').style.display = 'none';

    // Hiển thị khu vực câu hỏi
    var questionsDiv = document.getElementById('questionsContainer');
    questionsDiv.style.display = 'block';
}

function back() {
    document.getElementById('questionsContainer').style.display = 'none';
    document.getElementById('userForm').style.display = 'block';
}

function result() {
    window.scroll(0, 0);
    // Hiển thị kết quả và thông điệp cảm ơn
    var resultContainer = document.getElementById('result');
    resultContainer.innerHTML += '<p>Cảm ơn bạn đã tham gia khảo sát!</p>';
    
    var answers = document.getElementsByTagName('input');
    for (let i = 0; i < answers.length; i++) {
        answers[i].disabled = true;
    }

    document.getElementById('btnContainer').style.display = 'none';

    
}