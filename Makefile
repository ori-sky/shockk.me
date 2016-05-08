S3CMD=~/src/s3cmd/s3cmd

.PHONY: s3
s3:
	for f in `git diff-tree --no-commit-id --name-only --relative=public -r HEAD`; do $(S3CMD) put public/"$$f" s3://shockk.me/"$$f" --rr; done
