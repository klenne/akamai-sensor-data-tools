
function secondDecJson(payload, bmSzSecondComp) {
    const pcs = payload.split(":");
    const mixingIndexes = [];
    let bmSzSC = bmSzSecondComp;

    for (let i = 0; i < pcs.length; i += 1) {
        const x = ((bmSzSC >> 8) & 65535) % pcs.length;
        bmSzSC *= 65793;
        bmSzSC &= 4294967295;
        bmSzSC += 4282663;
        bmSzSC &= 8388607;

        const y = ((bmSzSC >> 8) & 65535) % pcs.length;
        bmSzSC *= 65793;
        bmSzSC &= 4294967295;
        bmSzSC += 4282663;
        bmSzSC &= 8388607;

        mixingIndexes.push([x, y]);
    }

    for (let i = mixingIndexes.length - 1; i >= 0; i -= 1) {
        const [x, y] = mixingIndexes[i];

        const pc = pcs[x];
        pcs[x] = pcs[y];
        pcs[y] = pc;
    }

    return pcs.join(":");
}

function bruteForceDecode(halfClean, bruteStartNumber, bruteEndNumber) {
    let start = bruteStartNumber < 0 ? 0 : bruteStartNumber;
    let end = bruteEndNumber <= 0 || bruteEndNumber <= bruteStartNumber ? Number.MAX_SAFE_INTEGER : bruteEndNumber;
    let startingBruteForce = new Date().getTime();
    for (let i = start; i <= end; i++) {
        try {
            let clean = secondDecJson(halfClean, i);
            let parsed = JSON.parse(clean);
            parsed["dynamicReorderingKeyFound"] = i;
            let endBrute = new Date().getTime();
            const elapsedTimeMs = endBrute - startingBruteForce;
            const elapsedSeconds = Math.floor(elapsedTimeMs / 1000);
            parsed["bruteForceExecutionTime"] = elapsedSeconds + 'seconds.';
            parsed["rawJson"] = clean;
            return parsed;
        } catch (error) { }
    }
    return null;
};

self.onmessage = function (e) {
    console.log("Starting Job brute force job in worker!");
    console.time();
    let data = e.data;
    let parsed = bruteForceDecode(data.halfClean, data.bruteStartNumber, data.bruteEndNumber);
    console.log("Brute force job finished!");
    console.timeEnd();
    postMessage({ parsed: parsed });
};