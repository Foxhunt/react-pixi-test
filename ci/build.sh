npm install
npm run build
echo {\"branch\": \"$CI_BUILD_REF_NAME\", \"commit\": \"$CI_BUILD_REF\", \"pipeline\": $CI_PIPELINE_ID} > public/build.json
