  const frame = document.getElementById('frame');
        const container = document.getElementById('container');
        const switchBtn = document.getElementById('switchBtn');

        const totalFrames1 = 720;
        const totalFrames2 = 263;
        const images1 = [];
        const images2 = [];
        for (let i = 1; i <= totalFrames1; i++) {
            images1.push(`scene/1/output_lite/output_frames${String(i).padStart(4, '0')}.jpeg`);
        }
        for (let i = 1; i <= totalFrames2; i++) {
            images2.push(`scene/2/output_lite/output_frames${String(i).padStart(4, '0')}.jpeg`);
        }

        let currentScene = 1;
        let images = images1;
        let totalFrames = totalFrames1;
        let currentFrame = 0;

        function updateFrame() {
            const scrollTop = window.pageYOffset;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScroll;
            const frameIndex = Math.floor(scrollFraction * (totalFrames - 1));
            if (frameIndex !== currentFrame && frameIndex < totalFrames) {
                currentFrame = frameIndex;
                frame.src = images[currentFrame];
            }
        }

        function switchScene() {
            currentScene = currentScene === 1 ? 2 : 1;
            images = currentScene === 1 ? images1 : images2;
            totalFrames = currentScene === 1 ? totalFrames1 : totalFrames2;
            container.style.height = (totalFrames * 10) + 'px';
            currentFrame = 0;
            frame.src = images[0];
            switchBtn.textContent = currentScene === 1 ? '720 frames' : '263 frames';
            window.scrollTo(0, 0);
        }

        switchBtn.addEventListener('click', switchScene);
        window.addEventListener('scroll', updateFrame);