import "./Category.css";

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
        <div className="category-container">
            {categories.map((category) => (
                <button
                    key={category}
                    className={
                        selectedCategory === category
                            ? "category-btn active"
                            : "category-btn"
                    }
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default Category;