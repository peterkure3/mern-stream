import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { Formik, Yup } from 'formik';
import ReactPlayer from 'react-player';

const VideoList = () => {
const [videos, setVideos] = useState([]);

useEffect(() => {
axios.get('/api/videos')
.then(res => setVideos(res.data))
.catch(err => console.error(err));
}, []);

return (
<div>
{videos.map(video => (
<div key={video.id}>
<h3>{video.title}</h3>
<p>{video.description}</p>
</div>
))}
</div>
);
}

const VideoPlayer = ({ videoId }) => {
const [video, setVideo] = useState({});

useEffect(() => {
axios.get(/api/videos/$,{videoId})
.then(res => setVideo(res.data))
.catch(err => console.error(err));
}, [videoId]);

return (
<div>
<ReactPlayer url={video.url} />
</div>
);
}

const UploadVideo = () => {
const initialValues = { title: '', description: '', file: null };
const validationSchema = Yup.object({
title: Yup.string().required('Title is required'),
description: Yup.string().required('Description is required'),
file: Yup.mixed().required('File is required')
});

const handleSubmit = (values, { setSubmitting }) => {
const formData = new FormData();
formData.append('title', values.title);
formData.append('description', values.description);
formData.append('file', values.file);

axios.post('/api/videos', formData)
  .then(res => {
    console.log(res);
    setSubmitting(false);
  })
  .catch(err => {
    console.error(err);
    setSubmitting(false);
  });
}

return (
<Formik
   initialValues={initialValues}
   validationSchema={validationSchema}
   onSubmit={handleSubmit}
 >
{({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
<form onSubmit={handleSubmit}>
<input 
         type="text" 
         name="title" 
         placeholder="Title" 
         onChange={handleChange} 
         onBlur={handleBlur} 
         value={values.title} 
       />
{errors.title && <p>{errors.title}</p>}
<input 
         type="text" 
         name="description" 
         placeholder="Description" 
         onChange={handleChange} 
         onBlur={handleBlur} 
         value={values.description} 
       />
{errors.description && <p>{errors.description}</p>}
<input 
         type="file" 
         name="file" 
         onChange={handleChange} 
         onBlur={handleBlur} 
         value={values.file} 
       />
{errors.file && <p>{errors.file}</p>}
<button type="submit" disabled={isSubmitting}>
Submit
</button>
</form>
)}
</Formik>
);
}

const Routes = () => {
return (
<BrowserRouter>
<Switch>
<Route exact path="/" component={VideoList} />
<Route path="/video/:id" component={VideoPlayer} />
<Route path="/upload" component={UploadVideo} />
</Switch>
</BrowserRouter>
);
}


export default Routes;




