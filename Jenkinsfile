pipeline {
    agent any

    tools {
        nodejs 'node' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Không dùng || true để Jenkins phản ánh đúng trạng thái test
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Jenkins sẽ tự thu thập kết quả từ allure-results
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}