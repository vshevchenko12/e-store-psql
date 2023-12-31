document.addEventListener('turbolinks:load', function () {
	let paintingImage = document.querySelector('.painting-image');

	function handleFileSelect(evt) {
		let files = evt.target.files; // FileList object

		// Loop through the FileList and render image files as thumbnails.
		for (let i = 0, f; (f = files[i]); i++) {
			// Only process image files.
			if (!f.type.match('image.*')) {
				continue;
			}

			let reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function (theFile) {
				return function (e) {
					// Render thumbnail.
					let span = document.createElement('span');
					span.innerHTML = [
						'<img class="painting-preview-thumb" src="',
						e.target.result,
						'" title="',
						escape(theFile.name),
						'"/>',
					].join('');
					document.getElementById('list').insertBefore(span, null);
				};
			})(f);
			// Read in the image file as a data URL.
			reader.readAsDataURL(f);
		}
	}

	if (paintingImage) {
		this.addEventListener('change', handleFileSelect, false);
	}
});
