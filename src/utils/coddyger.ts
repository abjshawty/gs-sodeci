import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import http from 'http';
// import mongoose from 'mongoose';
// const ObjectId = require('mongoose').Types.ObjectId;

export const cdg = {
    api: (context: any, promise: Promise<any>) => {
        promise.then((res: any) => {
            let status = res.status;
            let message = res.message;
            let data = res.data;
            let isFile: any = res.isFile;

            let response = {
                message,
                data: (data !== undefined || true ? data : [])
            };

            if (isFile) {
                context.setHeader('Content-type', data.type);
                context.end(data.file);
            } else {
                return context.status(status).json(response);
            }
        }).catch((err: any) => {
            console.log(err);
            return context.status(500).json({});
        }).catch((err: any) => {
            // console.log('CODDYGER::', err)
            return context.status(500).json({ error: true, message: "une erreur interne s'est produite veuillez réssayer plutard" });
        });
    },
    konsole: (msg: any, error = 0) => {
        let message = new Date().toISOString() + "[" + (
            error === 1 ? 'error' : 'info'
        ) + "]" + JSON.stringify(msg);
        if (error === 1) {
            console.error(message);
        } else {
            console.log(message);
        }
    },
    string: {
        is_empty: function (value: any) {
            return (value === undefined || value === null || value.length <= 0 || value === '');
        }, is_email: function (value: string) {
            const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return regexp.test(value);
        }, is_number: function (value: any) {
            return /^(?:-?\d+|-?\d{1, 3}(?:, \d{3})+)?(?:\.\d+)?$/.test(value);
        },
        is_date: function (value: any) {
            if (Object.prototype.toString.call(value) === "[object Date]") {
                return !isNaN(value.getTime());
            } else {
                return false;
            }
        },
        isDateString: function (dateString: string): boolean {
            const dateRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/;

            return dateRegex.test(dateString);
        },
        // Commented out since irrelevant to current codebase
        // isValidObjectId: (value: any) => {
        //     if (ObjectId.isValid(value)) {
        //         if ((String)(new ObjectId(value)) === value)
        //             return true;
        //         return false;
        //     }
        //     return false;
        // },
        // toObjectId: (value: any) => {
        //     try {
        //         return new mongoose.Types.ObjectId(value);
        //     } catch (error) {
        //         console.error('ERREUR::', error)
        //         return error;
        //     }
        // }, 
        // generateObjectId : () => {
        //     try {
        //         return new mongoose.Types.ObjectId();
        //     } catch (error) {
        //         console.error('ERREUR::', error)
        //         return error;
        //     }
        // }
    },
    generateSlug: () => {
        return uuidv4();
    },
    inArray: function (needle: any, haystack: any) {
        let length = haystack.length;
        for (let i = 0; i < length; i++) {
            if (haystack[i] === needle)
                return true;



        }
        return false;
    },
    getDate: (type: string = '') => {
        var d = new Date(),
            month = '' + (
                d.getMonth() + 1
            ),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;



        if (day.length < 2)
            day = '0' + day;



        return (type === 'string' ? [year, month, day].join('-') : new Date([year, month, day].join('-')));
    },
    dateOnlyFormat: (date: any) => {
        var d = new Date(date),
            month = '' + (
                d.getMonth() + 1
            ),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;



        if (day.length < 2)
            day = '0' + day;



        return [year, month, day].join('-');
    },
    file: {
        remove: function (filePath: string) {
            return fs.unlinkSync(filePath);
        },
        extension: function (filename: string) {
            return path.extname(filename).toLowerCase();
        },
        toBase64: (filename: string) => {
            return fs.readFileSync(filename, { encoding: "base64" });
        },
        exists: (filePath: string) => {
            return fs.existsSync(filePath);
        },
        download: (url: string, filename: string) => {
            return new Promise((resolve, reject) => {
                let file = fs.createWriteStream(cdg.root() + process.env.DOWNLOAD_PATH + '/' + filename);
                http.get(url, function (response: any) {
                    response.pipe(file);
                    file.on('finish', function () {
                        resolve(file);
                        file.close();
                    });
                });
            }).catch((e) => {
                return { error: true, data: e, messsage: '' };
            });
        }
    },
    object: {
        is_empty: function (obj: object) {
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    return false;
                }
            }
            return true;
        }
    },
    root: () => {
        return path.resolve(process.cwd());
    },
    errorObjectParser: (data: any, msg: string) => {
        return { error: true, data: data, msg: msg };
    },
    sanitizeEmail: (email: string): string => {
        if (!email) {
            return email;
        } else {
            let lowercase = email.toLowerCase();
            let nospace = lowercase.trim();

            return nospace;
        }
    },
};
