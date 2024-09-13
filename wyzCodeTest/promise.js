class Promise {

    constructor (excutor) {
        this.state = 'pending';
        this.fulledCallback = [];
        this.rejectCallBack = [];

        let resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                while (this.fulledCallback.length) {
                    let fn = this.fulledCallback.shift();
                    fn(this.value)
                }
            }
        }
        let reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'reject';
                this.reason = reason;
                while (this.rejectCallBack.length) {
                    let fn = this.rejectCallBack.shift();
                    fn(this.reason);
                }
            }
        }

        try {
            excutor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then (resolveFun, rejectFun) {
        if (typeof resolveFun !== 'function') {
            resolveFun = () => this.value
        }

        if (typeof rejectFun !== 'function') {
            rejectFun = reason => {
                throw this.reason
            }
        }

        let resolveThenFunction = (nextFun, resolve, reject, value) => {
            try {
                let res = nextFun(value);
                if (res.then) { // 是个 promise
                    res.then((value) => {
                        resolve(value)
                    }, (reason) => {
                        reject(reason);
                    });
                } else {
                    resolve(res);
                }
            } catch (e) {
                reject(e)
            }
        }

        let lastPromise = this;
        return new Promise((resolve, reject) => {
            this.value = lastPromise.value;
            this.reason = lastPromise.reason;
            if (this.state === 'fulfilled') {
                resolveThenFunction(resolveFun, resolve, reject, this.value);
            } else if (this.state === 'reject') {
                resolveThenFunction(rejectFun, resolve, reject, this.reason)
            } else {
                this.fulledCallback.push(resolveThenFunction.bind(this, resolveFun, resolve, reject));
                this.rejectCallBack.push(resolveThenFunction.bind(this, rejectFun, resolve, reject));
            }
        })
    }

}

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    })
}).then(() => {
    return new Promise((resolve, reject) => {
        reject('reject')
    })
}).then((value) => {
    console.log(value);
}, (err) => {
    console.log(err);
});
