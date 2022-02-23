const TrieNode =  key => {
    this.key = key
    this.parent = null;
    this.children = {};
    this.end = false;
    
    this.getWord = () => {
        let output = [];
        let node = this;
        
        while(node !== null){
            output.unshift(node.key);
            node = node.parent;
        }
        
        return output.join('');
    };
};

