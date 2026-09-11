pipeline {
    agent any

    // Cho phép chọn cấu hình linh hoạt khi trigger build thủ công trên Jenkins UI
    parameters {
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Trình duyệt sẽ chạy test')
        string(name: 'WORKERS', defaultValue: '3', description: 'Số worker chạy song song (khuyên dùng 3 - 5 khi có nhiều testcase)')
        choice(name: 'TEST_SCOPE', choices: ['all', '@smoke', '@regression'], description: 'Phạm vi test: all (toàn bộ), @smoke (chạy nhanh), @regression')
        string(name: 'RETRIES', defaultValue: '1', description: 'Số lần tự động chạy lại nếu test bị fail do nghẽn mạng')
    }

    environment {
        // Biến môi trường cho DB test (nếu dùng cleanup script global-teardown.ts)
        // Lưu giá trị thật trong Jenkins Credentials, KHÔNG hardcode ở đây
        TEST_DB_URL  = credentials('test-db-url')
        CI           = 'true'
    }

    options {
        timeout(time: 60, unit: 'MINUTES')             // Tăng timeout lên 60 phút nếu số lượng test lớn
        disableConcurrentBuilds()                      // Tránh 2 build cùng lúc đụng chung DB test
        buildDiscarder(logRotator(numToKeepStr: '20')) // Chỉ giữ lại 20 build gần nhất, tránh đầy ổ đĩa Jenkins
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'   // Dùng npm ci thay vì npm install để build ổn định, đúng version theo package-lock.json
            }
        }

        stage('Install Playwright browsers') {
            steps {
                sh 'npx playwright install --with-deps ${BROWSER}'
            }
        }

        stage('Run Playwright tests') {
            steps {
                script {
                    // Xử lý bộ lọc test case theo tag
                    def grepOption = (params.TEST_SCOPE == 'all') ? '' : "--grep=\"${params.TEST_SCOPE}\""

                    // Dùng catchError để nếu có test fail, pipeline vẫn tiếp tục xuống post stage tạo Allure Report
                    catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                        sh """
                            npx playwright test \
                              --project=${BROWSER} \
                              --workers=${WORKERS} \
                              --retries=${RETRIES} \
                              --fully-parallel \
                              ${grepOption}
                        """
                    }
                }
            }
        }

        stage('Check Server Specs') {
            steps {
                        sh 'nproc'    // In ra số nhân CPU của máy chủ
                        sh 'free -h'  // In ra dung lượng RAM còn trống của máy chủ
                }
}
    }

    post {
        always {
            // Lưu lại report HTML mặc định của Playwright
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            // Lưu lại screenshot/video/trace khi test fail
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true

            // Publish Allure report (cần cài "Allure Jenkins Plugin" trên Jenkins trước)
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
        unstable {
            echo '⚠️ Có một số test case bị FAILED! Hãy xem chi tiết trong Allure Report hoặc Playwright HTML Report.'
        }
        failure {
            echo '❌ Pipeline gặp lỗi hệ thống nghiêm trọng (lỗi cài đặt dependencies hoặc lỗi hạ tầng).'
        }
        success {
            echo '🎉 Tất cả test cases đều PASSED thành công!'
        }
    }
}