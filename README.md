# AWSにデプロイする方法

## 1. JavaのコードからJarファイルを作成する方法
```
mvn clean install
```

## 2.SAMでbuildする方法
```
sam build
```

## 3.SAMでデプロイする方法
```
# 初回
sam deploy --guided
# 2回目以降
sam deploy --guided
```




# デプロイ方法
```
aws lambda create-function --function-name MyJavaFunction \
--zip-file fileb://target/SampleJava-1.0-SNAPSHOT.jar --handler example.Handler \
--runtime java11 --role arn:aws:iam::484791410089:role/dev-konishi-lambda-role --profile xxxx
```
