pipeline {
    agent any

    tools {
        // Tên này phải trùng với tên bạn đặt trong Global Tool Configuration
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
                sh 'npm ci'
                // Cài đặt trình duyệt cho Playwright (cần thiết cho Linux)
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Sử dụng || true để pipeline không dừng lại nếu test fail, 
                // giúp Allure vẫn có dữ liệu để tạo report
                sh 'npx playwright test || true'
            }
        }
    }

    post {
        always {
            // Xuất báo cáo Allure
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            
            // Lưu lại Playwright report mặc định (tùy chọn)
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}