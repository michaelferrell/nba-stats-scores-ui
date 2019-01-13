import React from "react"
import styled from "styled-components"

import { COLOR } from "./../../constants/"

const Article = styled.div`
  background-color: ${COLOR.mineshaft};
  color: ${COLOR.alto};
  border-radius: 4px;
  padding: 1.2em;
`

const ArticleTitle = styled.h4``

const ArticleAuthor = styled.div`
  opacity: 0.7;
  margin: 1em 0;
  font-size: 0.9em;
`

const ArticleParagraph = styled.p``

export default ({ article }) => (
  <Article>
    <ArticleTitle>{article.title}</ArticleTitle>
    <ArticleAuthor>{article.author}</ArticleAuthor>
    {article.paragraphs.map(p => (
      <ArticleParagraph>{p.paragraph}</ArticleParagraph>
    ))}
  </Article>
)
