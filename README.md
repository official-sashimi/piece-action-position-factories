# npm-package-skeleton

## 概要

npm パッケージを自作する際に毎回お決まりのステップ(`npm init` とか lint や formatter などの定番ツールのインストールと設定など)を実行するのがめんどくさいので、それらを済ませたブランチを用意しておいて再利用する。

## 利用方法

### cloneとURL変更

```bash
$ git clone https://github.com/k0kishima/npm-package-skeleton.git <project_name>
$ git remote set-url origin <git repository url>
```

あとは適宜 `package.json` などを編集
