# TransferApp

Simple Web App to exchange files just using a browser or curl.

## Running
```sh
git clone https://github.com/morkin1792/TransferApp && cd TransferApp
npm install
node app.js
```

## Features
- Upload/Download via the web interface:

![](webInterface.png)

- Upload with curl:
```sh
curl -F 'file=@/etc/passwd' $WEB_APP_ADDRESS/upload
curl.exe -F 'file=@./sam' -F 'secret=1' $WEB_APP_ADDRESS/upload
```

- Download with curl:
```sh
curl $WEB_APP_ADDRESS/list
curl -O $WEB_APP_ADDRESS/download/$FILE
```

### TODO
- bug: files with name starting with dot cannot be downloaded
- ?add support to https