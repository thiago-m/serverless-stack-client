const dev = {
    STRIPE_KEY: "sk_test_jyrfULpZAyPBKi44tW9cHcR200iN4XgD3T",
    s3: {
        REGION: "us-east-1",
        BUCKET: "notes-app-2-api-dev-attachmentsbucket-1gczhb1hyo7gp"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://q4hihpm660.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_mGy6BRWd7",
        APP_CLIENT_ID: "7dhcgkup69b7ob83em2ovpvelr",
        IDENTITY_POOL_ID: "us-east-1:19ec0ff3-99c4-4f7a-8364-a322df831e0c"
    }
}

const prod = {
    STRIPE_KEY: "sk_test_jyrfULpZAyPBKi44tW9cHcR200iN4XgD3T",
    s3: {
        REGION: "us-east-1",
        BUCKET:  "notes-app-2-api-prod-attachmentsbucket-1knny6qrcoamy"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://4hl751uo27.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_tiPce7BJ4",
        APP_CLIENT_ID: "30k41olmcbisd96mmrs4cmj781",
        IDENTITY_POOL_ID: "us-east-1:46c76600-5f59-415a-9ee0-f8efe47b0b50"
    }
}

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
}