export OPEN_API_KEY := $(shell jq -r '.RecommendFunction.OpenApiKey' env.json)
export TMDB_API_KEY := $(shell jq -r '.RecommendFunction.TmdbApiKey' env.json)

start:
	sam local start-api --env-vars env.json

build:
	cd functions/recommendFunction && npm install && npm run build && cd ../.. 
	sam build

invoke:
	sam local invoke --event event.json --env-vars env.json

invoke-long:
	sam local invoke --event event-long.json --env-vars env.json

deploy:
	@echo OPEN_API_KEY=$(OPEN_API_KEY)
	@echo TMDB_API_KEY=$(TMDB_API_KEY)
	@sam deploy --parameter-overrides "OpenApiKey=$(OPEN_API_KEY) TmdbApiKey=$(TMDB_API_KEY)"
