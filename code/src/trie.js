const TrieNode = function (key) {
    this.key = key;
    this.parent = null;
    this.children = {};
    this.end = false;
    this.name = "";
    this.link="";
    
};

const Trie = function () {
    this.root = new TrieNode(null);
    
    this.insert = (word, data) => {
        let node = this.root;
        
        for (let i = 0; i < word.length; i++) {
            if(!node.children[word[i]]){
                node.children[word[i]] =  new TrieNode(word[i]);
                node.children[word[i]].parent = node;
            }
            node = node.children[word[i]];
            
            if (i === word.length - 1) {
                node.end = true;
                node.name = data.address1 + data.address2;
                node.link = 'estate/' + data.id
            }
        }
    };
    
    this.find = (prefix) => {
        let node = this.root;
        let output = [];
        for (let i = 0; i < prefix.length; i++) {
            if (node.children[prefix[i]]) {
                node = node.children[prefix[i]];
            } else {
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
export const zipCodeSuggest = new Trie();
export const citySuggest = new Trie();