var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var fs = require('fs');
var mocha = require('gulp-mocha');
const ejs = require('gulp-ejs');
const nodeSass = require('node-sass');
const options = require('./options.json');
const server = require('./webserver');
const build_folder = options.deploy.html_build_folder.endsWith('/') ? options.deploy.html_build_folder : options.deploy.html_build_folder + '/';
const file_name = options.deploy.html_file_name;
const src = build_folder + file_name;
const dest = options.deploy.dest;

gulp.task('assets', () => {

	var sassOptions = {
		functions: {
			'encodeBase64($string)': function($string) {
				
				var buffer = fs.readFileSync($string.getValue());
				return nodeSass.types.String(buffer.toString('base64'));
			}
		}
	};

	return gulp.src('index.ejs')
		.pipe(inject(gulp.src('main.scss').pipe(sass(sassOptions)),
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
		.pipe(ejs({
			config: options
		}))
		.pipe(rename('index.htm'))
		.pipe(gulp.dest('site'));
});

gulp.task('test', () => {
	return gulp.src('test/test.js')
		.pipe(mocha());
});

gulp.task('server_start', () => {
	server(build_folder + file_name, options.port, options.lsdevice.port, options.lsdevice.server);
});

gulp.task('build', gulp.series(['test', 'assets']));

gulp.task('run', gulp.series(['build', 'server_start']));

gulp.task('default', gulp.series(['run']));

gulp.task('deploy', () => {
	return gulp.src(src)
		.pipe(gulp.dest(dest));
});