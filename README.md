# ビルド方法
```
mvn clean install
```

# デプロイ方法
```
aws lambda create-function --function-name MyJavaFunction \
--zip-file fileb://target/SampleJava-1.0-SNAPSHOT.jar --handler example.Handler \
--runtime java11 --role arn:aws:iam::484791410089:role/dev-konishi-lambda-role --profile xxxx
```