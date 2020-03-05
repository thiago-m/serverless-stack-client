export default {
    STRIPE_KEY: "pk_test_mDVBjWakDOIbOeXX63D3s7g900UpFswB1M",
    s3: {
        REGION: "sa-east-1",
        BUCKET: "thiago.dev-notes-app-uploads"
    },
    apiGateway: {
        REGION: "sa-east-1",
        URL: "https://7lg619comd.execute-api.sa-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_X4gKLHanJ",
        APP_CLIENT_ID: "4knvas71gi01h7smvma90ardc7",
        IDENTITY_POOL_ID: "us-east-1:38cf8319-1f2f-4868-83f1-a11390804a91"
    },
    MAX_ATTACHMENT_SIZE: 5000000
}