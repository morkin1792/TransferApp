const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const commonFilesDir = 'files'
const secretFilesDir = 'secret_files'

app.disable('x-powered-by');
app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    var directory = commonFilesDir;
    if (req.body && req.body.secret) {
        directory = secretFilesDir;
    }
    const uploadedFile = req.files.file;
    const uploadPath = path.join(__dirname, directory, encodeURIComponent(uploadedFile.name));

    uploadedFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send("something is wrong");
        }
        res.redirect("/");
    });
});

app.get('/list', (req, res) => {
    const downloadDir = path.join(__dirname, commonFilesDir);

    fs.readdir(downloadDir, (err, files) => {
        if (err) {
            return res.status(500).send("something is wrong");
        }

        const fileList = files.map((file) => {
            if (file == ".gitignore") {
                return '';
            }
            return `<li><a href="/download/${file}">${file}</a></li>`;
        });

        const fileListHTML = `<ul>${fileList.join('\n')}</ul>`;
        res.send(fileListHTML);
    });
});

app.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, commonFilesDir, fileName);
    if (fs.existsSync(filePath)) {
        res.download(filePath, fileName, (err) => {
            res.status(500).send("something is wrong");
        });
    } else {
        res.status(404).send("nothing here :(");
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});