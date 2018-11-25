var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
const options = require('./options.json');
const build_folder = options.deploy.html_build_folder.endsWith('/') ? options.deploy.html_build_folder : options.deploy.html_build_folder + '/';
const file_name = options.deploy.html_file_name;
const src = build_folder + file_name;
const dest = options.deploy.dest;

gulp.task('assets', () => {
	return gulp.src('index.htm')
		.pipe(inject(gulp.src('main.scss').pipe(sass()),
			{ starttag: '<!-- inject:maincss -->', transform: (filePath, file) => { return '<style>'+file.contents.toString('utf8')+'</style>'; } }
		))
		.pipe(inject(gulp.src(['node_modules/jquery/dist/jquery.slim.js']),
			{ starttag: '<!-- inject:{{path}} -->', relative: true, transform: (filePath, file) => { return '<script>'+file.contents.toString('utf8')+'</script>'; } }
		))
		.pipe(inject(gulp.src(['node_modules/tether/dist/js/tether.min.js']),
			{ starttag: '<!-- inject:{{path}} -->', relative: true, transform: (filePath, file) => { return '<script>'+file.contents.toString('utf8')+'</script>'; } }
		))
		.pipe(inject(gulp.src(['node_modules/tether/dist/css/tether.min.css']),
			{ starttag: '<!-- inject:{{path}} -->', relative: true, transform: (filePath, file) => { return '<style>'+file.contents.toString('utf8')+'</style>'; } }
		))
		.pipe(inject(gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js']),
			{ starttag: '<!-- inject:{{path}} -->', relative: true, transform: (filePath, file) => { return '<script>'+file.contents.toString('utf8')+'</script>'; } }
		))
		.pipe(gulp.dest('site'));
});

gulp.task('default', gulp.series(['assets']));

gulp.task('deploy', () => {
	return gulp.src(src)
		.pipe(gulp.dest(dest));
});