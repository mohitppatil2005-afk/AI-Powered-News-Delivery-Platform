function Category({ selectedCategory, onCategoryChange }) {
    const categories = [
        "general",
        "technology",
        "business",
        "sports",
        "health",
        "science"
    ];

    return (
        <div className="categories">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default Category;