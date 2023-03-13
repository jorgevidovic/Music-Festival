const { src, dest, watch, parallel } = require("gulp");
const imagemin = require("gulp-imagemin");

//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require ('gulp-plumber');

// Images
const cache = require ('gulp-cache');
const imageMin = require ('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    src("src/scss/**/*.scss")  // Identificar el archivo SASS
    .pipe(plumber())
    .pipe(sass())  // Compilarlo
    .pipe(dest("build/css")); // Almacernala en el disco duro
    done(); // Callback que avisa a gulp cuando llegamos al final
}

function toImageMin(done){
    const options = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imageMin(options)))
    .pipe( dest('build/img'))
    done();
}

function toWebp(done){
    const options = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
    .pipe(webp(options))
    .pipe(dest('build/img'));
    done();
}

function toAvif(done){
    const options = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
    .pipe(avif(options))
    .pipe(dest('build/img'));
    done();
}

function javaScript(done){
    src('src/js/**/*.js')
    .pipe(dest('build/js'));
    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javaScript);
    done();
}

exports.css = css;
exports.javaScript = javaScript;
exports.toImageMin = toImageMin;
exports.toWebp = toWebp;
exports.toAvif = toAvif;
exports.dev = parallel(toImageMin, toWebp, toAvif, javaScript, dev);