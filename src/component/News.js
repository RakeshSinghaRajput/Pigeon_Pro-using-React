import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News =(props)=> {
  const [articles,setArticles]=useState([])
  const[loading,setLoading]=useState(true)
  const[page,setPage]=useState(1)
  const[totalResults,setToatalResults]=useState(0)
//  document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;

   const capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

     
    const updateNews=async()=> {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6ee672b486164bbcb96ac466bec9b1c4&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);  
      setArticles(parsedData.articles)
      setPage(page)
      setToatalResults(parsedData.totalResults)
      setLoading(false)
      console.log(page)
    }
    
     const handleNextClick = async ()=>{
        console.log("Next"); 
        if (!(page + 1 > Math.ceil(totalResults/props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6ee672b486164bbcb96ac466bec9b1c4&page=${page + 1}&pageSize=${props.pageSize}`;
           setLoading(true)
            let data = await fetch(url);
            let parsedData = await data.json() 
            
      setArticles(parsedData.articles)
      setPage(page+1)
      setToatalResults(parsedData.totalResults)
      setLoading(false)
          }
        }
        
    // const componentDidMount=async()=> {
    //     this.updateNews();
    // }
    useEffect(()=>{
        updateNews();
    },[])

   const  handlePrevClick = async () => {
      if (!(page - 1 > Math.ceil(totalResults/props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6ee672b486164bbcb96ac466bec9b1c4&page=${page - 1}&pageSize=${props.pageSize}`;
            setLoading(true)
            let data = await fetch(url);
            let parsedData = await data.json() 
           setArticles(parsedData.articles)
      setPage(page-1)
      setToatalResults(parsedData.totalResults)
      setLoading(false)
          }
    }
       const fetchMoreData=async()=>{
        setPage(page+1)
        console.log(page)
         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6ee672b486164bbcb96ac466bec9b1c4&page=${page+1}&pageSize=${props.pageSize}`;
        
       setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
      console.log(parsedData);  
      setArticles(articles.concat(parsedData.articles))
      setToatalResults(parsedData.totalResults)
      setLoading(false)
       } 

        return (
            <>
                <h1 className="text-center" style={{margin: '100px 0px 50px 0px'}}>NewsMonkey - Top Headlines</h1>
                {/* {this.state.loading && <Spinner/>} */}

            <InfiniteScroll
                 dataLength={articles.length}
                 next={fetchMoreData}
                 hasMore={articles.length!==totalResults}
                 loader={<Spinner/>}>
            <div className='container'>
                <div className="row"> 
                {articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div> 
                })} 
                </div>
                </div>
                 </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }


      News.defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'
      }

    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

export default News