pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io"
        BACKEND_IMAGE = "ghcr.io/yogeshpc2/restaurant-backend"
        FRONTEND_IMAGE = "ghcr.io/yogeshpc2/restaurant-frontend"
        TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

stage('Login to GHCR') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'ghcr-username',
                usernameVariable: 'GHCR_USER',
                passwordVariable: 'GHCR_TOKEN'
            )
        ]) {
            sh """
            echo Logging in to GHCR...
            echo \$GHCR_TOKEN | docker login ghcr.io -u \$GHCR_USER --password-stdin
            """
        }
    }
}


        stage('Build Backend Image') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE}:${TAG} restaurant-management-backend/"
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t ${FRONTEND_IMAGE}:${TAG} restaurant-management-frontend/"
            }
        }

        stage('Push Images') {
            steps {
                sh """
                docker push ${BACKEND_IMAGE}:${TAG}
                docker push ${FRONTEND_IMAGE}:${TAG}
                """
            }
        }
    }
}
