from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from models import Bookmark, Like, ReadingHistory

def build_user_profile():
    likes= Like.query.all()
    bookmarks= Bookmark.query.all()
    history= ReadingHistory.query.all()

    interactions= likes+bookmarks+history

    if not interactions:
        return ""
    
    profile_text=[]

    for article in interactions:
        category= article.category or ""
        title= article.title or ""
        description= article.description or ""

        article_text= f"{category} {title} {description}"

        profile_text.append(article_text)
    
    return " ".join(profile_text)


def recommend_articles(articles, limit=10):
    user_profile = build_user_profile()

    if not user_profile:
        return articles[:limit]

    interacted_urls = set()

    for article in Like.query.all():
        interacted_urls.add(article.url)

    for article in Bookmark.query.all():
        interacted_urls.add(article.url)

    for article in ReadingHistory.query.all():
        interacted_urls.add(article.url)

    candidate_articles = [
        article
        for article in articles
        if article.get("url") not in interacted_urls
    ]

    if not candidate_articles:
        return []

    article_texts = []

    for article in candidate_articles:
        category = article.get("category") or ""
        title = article.get("title") or ""
        description = article.get("description") or ""

        text = f"{category} {title} {description}"

        article_texts.append(text)

    documents = [user_profile] + article_texts

    vectorizer = TfidfVectorizer(stop_words="english")

    tfidf_matrix = vectorizer.fit_transform(documents)

    user_vector = tfidf_matrix[0:1]

    article_vectors = tfidf_matrix[1:]

    similarity_scores = cosine_similarity(
        user_vector,
        article_vectors
    ).flatten()

    scored_articles = list(
        zip(candidate_articles, similarity_scores)
    )

    scored_articles.sort(
        key=lambda item: item[1],
        reverse=True
    )

    recommendations = [
        article
        for article, score in scored_articles[:limit]
    ]

    return recommendations