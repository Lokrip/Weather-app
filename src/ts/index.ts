export const CONNECT_NAME = ['#wrapper', '.wrapper', '[data-wrapper]']
export const tagsCreate = [
    'a',      
    'abbr',   
    'address',
    'area',   
    'article',
    'aside',  
    'audio',  
    'b',      
    'base',   
    'bdi',    
    'bdo',    
    'blockquote',
    'body',     
    'br',       
    'button',   
    'canvas',   
    'caption',  
    'cite',     
    'code',     
    'col',      
    'colgroup', 
    'data',     
    'datalist', 
    'dd',       
    'del',      
    'details',  
    'dfn',      
    'dialog',   
    'div',      
    'dl',       
    'dt',       
    'em',       
    'embed',    
    'fieldset', 
    'figcaption',
    'figure',   
    'footer',   
    'form',     
    'h1',       
    'h2',       
    'h3',       
    'h4',       
    'h5',       
    'h6',       
    'head',     
    'header',   
    'hgroup',   
    'hr',       
    'html',     
    'i',        
    'iframe',   
    'img',      
    'input',    
    'ins',      
    'kbd',      
    'label',    
    'legend',   
    'li',       
    'link',     
    'main',     
    'map',      
    'mark',     
    'meta',     
    'meter',    
    'nav',      
    'noscript', 
    'object',   
    'ol',       
    'optgroup', 
    'option',   
    'output',   
    'p',        
    'picture',  
    'pre',      
    'progress', 
    'q',        
    'rp',      
    'rt',       
    'ruby',     
    's',        
    'samp',     
    'script',   
    'section',  
    'select',   
    'small',    
    'source',   
    'span',     
    'strong',   
    'style',    
    'sub',      
    'summary',  
    'sup',      
    'table',    
    'tbody',    
    'td',       
    'template', 
    'textarea', 
    'tfoot',    
    'th',       
    'thead',    
    'time',     
    'title',    
    'tr',       
    'u',        
    'ul',       
    'var',      
    'video',    
    'wbr'       
];

export const createElements = (
    tag: string, 
    className: string | null | string[] = null, 
    depth: number = 0, 
    depthTags: string[] = [],
    attributes: Record<string, string> = {}
) => {
    if (!tagsCreate.includes(tag)) {
        throw new Error('Tag not found!');
    }

    const tagCreate = document.createElement(tag);

    // Добавляем классы
    if (className) {
        if (Array.isArray(className)) {
            tagCreate.classList.add(...className);
        } else {
            tagCreate.className = className;
        }
    }

    // Добавляем атрибуты
    Object.keys(attributes).forEach(attr => {
        tagCreate.setAttribute(attr, attributes[attr]);
    });

    // Рекурсивное создание вложенных элементов
    const createNestedElements = (element: HTMLElement, currentDepth: number) => {
        if (currentDepth <= 0) return;

        depthTags.forEach(depthTag => {
            if (!tagsCreate.includes(depthTag)) {
                throw new Error('Invalid depth tag');
            }
            const nestedElement = document.createElement(depthTag);
            element.appendChild(nestedElement);
            createNestedElements(nestedElement, currentDepth - 1);
        });
    };

    if (depth > 0) {
        createNestedElements(tagCreate, depth);
    }

    return tagCreate;
};


export const is_valid = () => {

}


//Api Key Weather
export const API_KEY = 'c8637bc73f6b6c56cc671aa66a8c006c'
export const KELVIN_TO_CELSIUS = 273