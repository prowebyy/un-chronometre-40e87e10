class Chronometer {
    constructor() {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.intervalId = null;
        this.laps = [];
        
        this.display = document.getElementById('display');
        this.milliseconds = document.getElementById('milliseconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapsContainer = document.getElementById('laps');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());
    }
    
    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.isRunning = true;
            this.intervalId = setInterval(() => this.updateDisplay(), 10);
            
            this.startBtn.textContent = 'Reprendre';
            this.display.classList.add('running');
            this.display.classList.remove('paused');
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.intervalId);
            
            this.display.classList.remove('running');
            this.display.classList.add('paused');
        }
    }
    
    reset() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.elapsedTime = 0;
        this.laps = [];
        
        this.updateDisplay();
        this.startBtn.textContent = 'Démarrer';
        this.lapsContainer.innerHTML = '';
        
        this.display.classList.remove('running', 'paused');
    }
    
    updateDisplay() {
        if (this.isRunning) {
            this.elapsedTime = Date.now() - this.startTime;
        }
        
        const totalSeconds = Math.floor(this.elapsedTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((this.elapsedTime % 1000) / 10);
        
        this.display.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        this.milliseconds.textContent = ms.toString().padStart(2, '0');
    }
    
    recordLap() {
        if (this.isRunning) {
            const lapTime = this.elapsedTime;
            this.laps.push(lapTime);
            
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item bg-gray-50 p-2 rounded mb-2 text-sm font-mono';
            
            const lapNumber = this.laps.length;
            const lapTimeFormatted = this.formatTime(lapTime);
            
            lapItem.textContent = `Tour ${lapNumber}: ${lapTimeFormatted}`;
            this.lapsContainer.prepend(lapItem);
        }
    }
    
    formatTime(time) {
        const totalSeconds = Math.floor(time / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((time % 1000) / 10);
        
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        }
    }
}

// Initialiser le chronomètre quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new Chronometer();
});