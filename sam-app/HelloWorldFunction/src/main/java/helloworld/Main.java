import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ListBucketsResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.model.Bucket;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;
import software.amazon.awssdk.services.dynamodb.model.ListTablesRequest;
import software.amazon.awssdk.services.dynamodb.model.ListTablesResponse;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemResponse;
import software.amazon.awssdk.services.dynamodb.model.ResourceNotFoundException;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import java.util.HashMap;
import java.util.List;

public class Main {
    public static void listAllTables(DynamoDbClient ddb) {
        boolean moreTables = true;
        String lastName = null;

        while (moreTables) {
            try {
                ListTablesResponse response = null;
                if (lastName == null) {
                    ListTablesRequest request = ListTablesRequest.builder().build();
                    response = ddb.listTables(request);
                } else {
                    ListTablesRequest request = ListTablesRequest.builder()
                            .exclusiveStartTableName(lastName).build();
                    response = ddb.listTables(request);
                }

                List<String> tableNames = response.tableNames();
                if (tableNames.size() > 0) {
                    for (String curName : tableNames) {
                        System.out.format("* %s\n", curName);
                    }
                } else {
                    System.out.println("No tables found!");
                    System.exit(0);
                }

                lastName = response.lastEvaluatedTableName();
                if (lastName == null) {
                    moreTables = false;
                }

            } catch (DynamoDbException e) {
                System.err.println(e.getMessage());
                System.exit(1);
            }
        }
        System.out.println("\nDone!");
    }

    public static void putItemInTable(DynamoDbClient ddb, String tableName) {
        HashMap<String, AttributeValue> itemValues = new HashMap<>();
        itemValues.put("name", AttributeValue.builder().s("hoge").build());
        itemValues.put("path", AttributeValue.builder().s("xxxx").build());

        PutItemRequest request = PutItemRequest.builder()
                .tableName(tableName)
                .item(itemValues)
                .build();

        try {
            PutItemResponse response = ddb.putItem(request);
            System.out.println(tableName + " was successfully updated. The request id is "
                    + response.responseMetadata().requestId());

        } catch (ResourceNotFoundException e) {
            System.err.format("Error: The Amazon DynamoDB table \"%s\" can't be found.\n", tableName);
            System.err.println("Be sure that it exists and that you've typed its name correctly!");
            System.exit(1);
        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }

    public static void main(String[] args) {
        // Hello Worldと表示
        String profileName = "aws-semi"; // プロファイル名を指定

        try {
            // NOTE: 1. Clientを構築
            DynamoDbClient ddb = DynamoDbClient.builder()
                    .credentialsProvider(ProfileCredentialsProvider.create("aws-semi"))
                    .region(Region.AP_NORTHEAST_1)
                    .build();
            listAllTables(ddb);
            putItemInTable(ddb, "konishi-semi-table");
            ddb.close();
            // プロファイルを使用してS3クライアントを構築
            S3Client s3 = S3Client.builder()
                    .credentialsProvider(ProfileCredentialsProvider.create(profileName))
                    .region(Region.AP_NORTHEAST_1) // リージョンを指定
                    .build();

            // バケットリストを取得して出力
            ListBucketsResponse buckets = s3.listBuckets();
            for (Bucket bucket : buckets.buckets()) {
                System.out.println(bucket.name());
            }

            // S3クライアントを終了
            s3.close();

        } catch (S3Exception e) {
            e.printStackTrace();
        }
    }
}
