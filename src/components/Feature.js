import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
    // this is deconstructing props
  const {
    searchTerm,
    searchValue,
    setIsLoading,
    setSearchResults,
  } = props

  return <span className="content">
            <a href="#" onClick={async (event) => {
                event.preventDefault()
                setIsLoading(true)


                try {
                    const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue)
                    setSearchResults(results)
                } catch {
                    console.error()
                } finally {
                    setIsLoading(false)
                }
            }}>{searchValue}</a>
        </span>
}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {
const {featuredResult} = props // this wil contain all the facts needed
console.log(featuredResult)

    if (!featuredResult) {
        return <main id="feature"></main>
    }
    const {
        title,
        dated,
        images, // THIS IS AN ARRAY
        primaryimageurl, // only use if making image or something clickable
        description,
        culture, // SEARCHABLE
        style,
        technique, // SEARCHABLE
        medium, // SEARCHABLE
        dimensions,
        people, // SEARCHABLE -- person.displayname
        department,
        division,
        contact,
        creditline,
    } = featuredResult || {}

    return <main id="feature">
        <div className="object-feature">
            <header> 
                {/* could do featuredResults.title, but we deconstructed both into props */}
                <h3>{title}</h3> 
                <h4>{dated}</h4>
            </header>
            <section className="facts">
                {/* <span className="title">FACT NAME</span>
                <span className="content">FACT VALUE</span> */}
                {
                    description ?
                        <Fragment>
                            <span className="title">Description</span>
                            <span className="content">{description}</span>
                        </Fragment>
                    : null
                }
                {
                    culture ?
                        <Fragment>
                            <span className="title">Culture</span>
                            <Searchable searchTerm="culture" searchValue={culture} {...props} />
                        </Fragment>
                    : null
                }
                {
                    technique ?
                        <Fragment>
                            <span className="title">Technique</span>
                            <Searchable searchTerm="technique" searchValue={technique} {...props} />
                        </Fragment>
                    : null
                }
                {
                    people ?
                    people.map((person, idx) =>
                        <Fragment key={idx}>
                            <span className="title">Person</span>
                            <Searchable searchTerm="culture" searchValue={person.displayname} {...props} />
                        </Fragment>
                        )
                    : null
                }
                {
                    department ?
                        <Fragment>
                            <span className="title">Department</span>
                            <span className="content">{department}</span>
                        </Fragment>
                    : null
                }
                {
                    division ?
                        <Fragment>
                            <span className="title">Department</span>
                            <span className="content">{division}</span>
                        </Fragment>
                    : null
                }
                {
                    contact ?
                    <Fragment>
                            <span className="title">Contact</span>
                            <span className="content"><a href={contact}>{contact}</a></span>
                        </Fragment>
                    : null
                }
                {
                    creditline ?
                    <Fragment>
                            <span className="title">Credit</span>
                            <span className="content">{creditline}</span>
                        </Fragment>
                    : null
                }
                {
                    style ?
                        <Fragment>
                            <span className="title">style</span>
                            <span className="content">{style}</span>
                        </Fragment>
                    : null
                }
                {
                    medium ?
                        <Fragment>
                            <span className="title">medium</span>
                            <Searchable searchTerm="medium" searchValue={medium} {...props} />
                        </Fragment>
                    : null
                }
                {
                    dimensions ?
                    <Fragment>
                            <span className="title">Culture</span>
                            <span className="content">{dimensions}</span>
                        </Fragment>
                    : null
                }  
            </section>
            <section className="photos">
            {
                    images ?
                    images.map((image, idx) =>
                        <Fragment key={idx}>
                            <a href={primaryimageurl}><img src={image.baseimageurl} alt={image.description}  {...props} /></a>
                        </Fragment>
                        )
                    : null
                }
                {/* {<img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />} 
                remember to map over these because they can be an array
                
                use image.baseimagurl for image URL
                use image.creditline or image.description for alt
                */}
            </section>
        </div>
    {/* if no feature, return null */}
    </main>
}  

export default Feature;