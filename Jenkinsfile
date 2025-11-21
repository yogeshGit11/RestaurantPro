pipeline {
    agent any

    environment {
        REGISTRY = "docker.io"
        BACKEND_IMAGE = "docker.io/yogeshpc2/restaurant-backend"
        FRONTEND_IMAGE = "docker.io/yogeshpc2/restaurant-frontend"
        TAG = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'REG_USER',
                        passwordVariable: 'REG_PASS'
                    )
                ]) {
                    sh """
                    echo "Logging into Docker Hub..."
                    echo \$REG_PASS | docker login -u \$REG_USER --password-stdin
                    """
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                sh """
                docker build -t ${BACKEND_IMAGE}:${TAG} restaurant-management-backend/
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh """
                docker build -t ${FRONTEND_IMAGE}:${TAG} restaurant-management-frontend/
                """
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
