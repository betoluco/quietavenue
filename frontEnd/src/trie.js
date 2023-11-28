const TrieNode = function (key) {
    this.key = key;
    this.parent = null;
    this.children = {};
    this.end = false;
    
};

//Trie are created in Root.js component
//and used in Search.js component

const Trie = function () {
    this.root = new TrieNode(null);
    
    this.insert = (word, name, link) => {
        let node = this.root;
        word = word.toLowerCase();
        
        for (let i = 0; i < word.length; i++) {
            if(!node.children[word[i]]){
                node.children[word[i]] =  new TrieNode(word[i]);
                node.children[word[i]].parent = node;
            }
            node = node.children[word[i]];
            
            if (i === word.length - 1) {
                node.end = true;
                node.name = name;
                node.link = link;
            }
        }
    };
    
    this.find = (prefix) => {
        let node = this.root;
        let output = [];
        for (let i = 0; i < prefix.length; i++) {
            if (node.children[prefix[i].toLowerCase()]) {
                node = node.children[prefix[i].toLowerCase()];
            } 
            else {
                
                if (node.end) {
                    output.push({
                        "name": node.name,
                        "link": node.link
                    });
                } 
                else {
                    if (i > 2) {
                        findAllWords(
                            node, 
                            output
                        );
                        return output;
                    }
                }
                return output;
            }
        }
        
        findAllWords(node, output);
        
        return output;
    };
    
    const findAllWords = (node, arr) => {
        if (node.end) {
            arr.push({
                "name": node.name,
                "link": node.link
            });
        }
        
        for (let child in node.children) {
            findAllWords(node.children[child], arr);
        }
    };
};

export const estateSuggest = new Trie();
export const citySuggest = new Trie();
export const zipCodeSuggest = new Trie();
