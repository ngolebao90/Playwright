pipeline {
    agent any

    // Cho phép chọn browser/số worker khi trigger build thủ công trên Jenkins UI
    parameters {
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Trình duyệt sẽ chạy test')
        string(name: 'WORKERS', defaultValue: '1', description: 'Số worker chạy song song')
    }

    environment {
        // Biến môi trường cho DB test (nếu dùng cleanup script global-teardown.ts)
        // Lưu giá trị thật trong Jenkins Credentials, KHÔNG hardcode ở đây
        TEST_DB_URL  = credentials('test-db-url')
        CI           = 'true'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')     // tránh pipeline treo vô hạn nếu test bị hang
        disableConcurrentBuilds()               // tránh 2 build cùng lúc đụng chung DB test
        buildDiscarder(logRotator(numToKeepStr: '20'))  // chỉ giữ lại 20 build gần nhất, tránh đầy ổ đĩa Jenkins
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'   // dùng npm ci thay vì npm install để build ổn định, đúng version theo package-lock.json
            }
        }

        stage('Install Playwright browsers') {
            steps {
                sh 'npx playwright install --with-deps ${BROWSER}'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh """
                    npx playwright test \
                      --project=${BROWSER} \
                      --workers=${WORKERS} \
                      --reporter=html,allure-playwright
                """
            }
        }
    }

    post {
        always {
            // Lưu lại report HTML mặc định của Playwright
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            // Lưu lại screenshot/video khi test fail
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true

            // Publish Allure report (cần cài "Allure Jenkins Plugin" trên Jenkins trước)
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
        failure {
            echo 'Pipeline failed - kiểm tra playwright-report hoặc allure report để xem chi tiết lỗi.'
        }
    }
}