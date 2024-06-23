import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostService from "./API/PostService";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Description from "./components/Description";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Number of posts per page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      const response = await PostService.getAll(limit, page);

      setPosts(response.data);
      const totalCount = parseInt(response.headers["x-total-count"], 10);
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setPosts([]);
    }
  };

  const sortedPosts = useMemo(() => {
    if (selectedSort) {
      return [...posts].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return posts;
  }, [selectedSort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="App">
      <Header />
      <div id="home" className="all_content">
        <button style={{ marginLeft: "0px" }} onClick={fetchPosts}>
          GET POSTS
        </button>
        <PostForm create={createPost} />
        <hr style={{ margin: "15px 0" }} />
        <div>
          <MyInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск..."
          />
          <MySelect
            defaultValue={selectedSort}
            onChange={(sort) => setSelectedSort(sort)}
            options={[
              { value: "title", name: " По названию" },
              { value: "body", name: " По описанию" },
            ]}
          />
        </div>
        {sortedAndSearchedPosts.length !== 0 ? (
          <PostList
            remove={removePost}
            posts={sortedAndSearchedPosts}
            title="Список постов 1"
          />
        ) : (
          <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>
        )}
        <div className="pagination">
          <button onClick={() => changePage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>{page}</span>
          <button
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div id="home">
        <Description />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}

export default App;
