import {Formik, Form, Field} from 'formik'
import {useState} from 'react'
import './css/header.css'
import './css/container.css'
import './css/article.css'

const App =() => {
  const [photos, setPhotos] = useState([]);
  const open = (link) => window.open(link)
  console.log({photos})
  return (
    <div>
      <header>
        <Formik
          initialValues = {{search:''}}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
              headers: {
                'Authorization': 'Client-ID r-zeYWGuARQCij40X4aeFLfoN0ncMVu4b5GtgZC6IjE'
              }
            })
           
           const data = await response.json()
           setPhotos(data.results)
          }}
        >
        <Form>
          <Field type="text" name="search"/>
        </Form>

        </Formik>
      </header>

      <div className='container'>
        <div className='center'>
          {photos.map(p => 
            <article  key={p.id} onClick={()=>open(p.links.html)}>
              <img  src={p.urls.regular} alt={p.urls.regular} />
              <p>{[p.description, p.alt_description].join('-')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
