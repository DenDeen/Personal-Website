# -- Project information -----------------------------------------------------
project = 'Mikkel Skovdal'
copyright = '2025, Mikkel Skovdal'
author = 'Mikkel Skovdal'

# -- General configuration ---------------------------------------------------
extensions = [
    # 'sphinx.ext.autodoc', # Not needed unless documenting code
    # 'sphinx.ext.napoleon', # Not needed
    'sphinx.ext.githubpages', # Helps with GitHub Pages deployment links
    'sphinx_copybutton',
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# The master toctree document.
master_doc = 'index' # For older Sphinx versions, root_doc for newer

# THEME SELECTION (FURO)
html_theme = 'furo'
html_title = "Mikkel Skovdal" # Shows in browser tab and header

# See Furo documentation for all options: https://pradyunsg.me/furo/customisation/
html_theme_options = {
    "sidebar_hide_name": True,
    "navigation_with_keys": True,
    "light_css_variables": {
        "color-brand-primary": "#007bff",
        "color-brand-content": "#007bff",
    },
    "dark_css_variables": {
        "color-brand-primary": "#6bbaff",
        "color-brand-content": "#6bbaff",
    },
}

# Add any paths that contain custom static files (CSS, images)
html_static_path = ['_static']

# Custom CSS file relative to html_static_path
html_css_files = [
    'css/custom.css',
]