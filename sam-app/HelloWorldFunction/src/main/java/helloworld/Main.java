import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ListBucketsResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.model.Bucket;
public class Main {
    public static void main(String[] args) {
        // Hello Worldと表示
        String profileName = "aws-semi"; // プロファイル名を指定

        try {
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
