import axios from "axios";

const SparkMD5 = require('spark-md5');
const chunkSize = 1 * 1024 * 1024 * 200;

interface Props {
    headers: any
    catalogId: number
    file: File,
    onFinish: (data) => void,
    onProgress: (progress) => void,
    onError:  (error) => void,
}

// @ts-ignore
export class FileUpload {
    props: Props

    constructor(props: Props) {
        this.props = props;
        this.upload(this.props.file);
    }

    sign() {

    }

    async upload(file: File) {
        const blobSlice =
            File.prototype.slice || (File.prototype as any).mozSlice || (File.prototype as any).webkitSlice;
        const blockCount = Math.ceil(file.size / chunkSize);
        const hash = await this.hashFile(file);
        console.log(hash);
        for (let i = 0; i < blockCount; i++) {
            const start = i * chunkSize;
            const end = Math.min(file.size, start + chunkSize);
            // Build a form
            const form = new FormData();
            form.append('file', blobSlice.call(file, start, end));
            form.append('name', file.name);
            form.append('total', blockCount.toString());
            form.append('index', i.toString());
            form.append('size', file.size.toString());
            form.append('hash', hash);
            // ajax submits a slice, where content-type is multipart/form-data
            const axiosOptions = {
                headers: this.props.headers,
                onUploadProgress: e => {
                    // Progress in processing uploads
                    const chunkProgress = e.loaded / e.total;
                    const baseProgress = i / blockCount;
                    const oneItemProgress =  (blockCount / 100) / 100
                    const progress = Math.floor((baseProgress + (oneItemProgress * chunkProgress)) * 100)
                    this.props.onProgress(progress === 100 ? 99 : progress)
                },
            };
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/media/upload/chunk`, form, axiosOptions);
        }
        // Merge chunks
        const data = {
            size: file.size,
            name: file.name,
            total: blockCount,
            hash
        };
        const res = await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/api/media/upload/finish`, data, {
                headers: this.props.headers,
            });

        const resCatalog = await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/api/catalog`, {
                mediaId: res.data.mediaId,
                name: file.name,
                entryType: 'file',
                parentId: this.props.catalogId
            }, {
                headers: this.props.headers,
            });

        console.log("resCatalog.data", resCatalog.data)
        this.props.onFinish({...res.data, catalogId: resCatalog.data.id});
    }

    async hashFile(file): Promise<string> {
        const sparkMd5 = new SparkMD5();
        sparkMd5.append((new Date()).toISOString());
        sparkMd5.append(file.name);
        return sparkMd5.end();

    }

}
