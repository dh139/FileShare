const socket = io();

// Function to handle file upload
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const { fileUrl, fileName } = data;
        const downloadLink = `<a href="${fileUrl}" download>${fileName}</a>`;
        const fileList = document.getElementById('fileList');
        fileList.insertAdjacentHTML('beforeend', downloadLink);
    })
    .catch(error => console.error('Error:', error));
}

// Socket.io event listener for fileUploaded
socket.on('fileUploaded', data => {
    const { fileUrl, fileName } = data;
    const downloadLink = `<a href="${fileUrl}" download>${fileName}</a>`;
    const fileList = document.getElementById('fileList');
    fileList.insertAdjacentHTML('beforeend', downloadLink);
});
socket.on('fileUploaded', data => {
    const { fileUrl, fileName, fileSize, uploadDate } = data;
    const fileSizeFormatted = (fileSize / 1024).toFixed(2) + ' KB';
    const uploadDateFormatted = new Date(uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    
    const fileItem = `
        <div class="file-item">
            <a href="${fileUrl}" download><i class="fas fa-file"></i> ${fileName}</a>
            <span>${fileSizeFormatted} | ${uploadDateFormatted}</span>
        </div>
    `;
    
    const fileList = document.getElementById('fileList');
    fileList.insertAdjacentHTML('beforeend', fileItem);
});
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds the limit of 10MB.');
        return;
    }

    // Validate file type (allow only images)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload an image (JPEG, PNG, GIF).');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const { fileUrl, fileName, fileSize, uploadDate } = data;
        // Display file in file list
        // ...
    })
    .catch(error => console.error('Error:', error));
}

