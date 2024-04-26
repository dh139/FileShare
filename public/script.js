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

    // Perform file upload
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const { fileUrl, fileName, fileSize, uploadDate } = data;
        // Display file in file list
        displayFile(fileUrl, fileName, fileSize, uploadDate);
    })
    .catch(error => console.error('Error:', error));
}

function displayFile(fileUrl, fileName, fileSize, uploadDate) {
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
}

// Update uploadFile function to handle any file type
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Perform file upload
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const { fileUrl, fileName, fileSize, uploadDate } = data;
        // Display file in file list
        displayFile(fileUrl, fileName, fileSize, uploadDate);
    })
    .catch(error => console.error('Error:', error));
}

// MIME types for various file formats
const allowedTypes = [
    'image/jpeg',        // JPEG images
    'image/png',         // PNG images
    'image/gif',         // GIF images
    'application/pdf',   // PDF documents
    'video/mp4',         // MP4 videos
    'video/quicktime',   // QuickTime videos
    'application/msword', // Word documents
    'application/vnd.ms-powerpoint', // PowerPoint presentations
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word (DOCX) documents
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PowerPoint (PPTX) presentations
    'application/octet-stream' // Any other file type
];

// Update file type validation to allow any of the specified MIME types
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    // Check if the file type is allowed
    if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload an image, PDF, video, Word document, PowerPoint presentation, or other supported file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Perform file upload
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const { fileUrl, fileName, fileSize, uploadDate } = data;
        // Display file in file list
        displayFile(fileUrl, fileName, fileSize, uploadDate);
    })
    .catch(error => console.error('Error:', error));
}
