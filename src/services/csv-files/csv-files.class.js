const GitHub = require('github-api') ;
const dayjs = require('dayjs');

let files = [];
let lastLoadTime = null;

const cred = {
    username: 'dave@wonderlandlabs.com', password: process.env.GITHUB_PASS
};

console.log('cred:', cred);
// unauthenticated client
const gh = new GitHub(cred);
const repo = gh.getRepo('Lucas-Czarnecki', 'COVID-19-CLEANED-JHUCSSE');

async function climbTree(path, tree){
    if (!Array.isArray(path)) {
        return climbTree(path.split('/'), tree);
    }
    
    console.log('tree is ', tree);
    const {sha} = tree;
    
    const {data} = await repo.getTree(sha);
    if (!path.length) return data.tree;
    
    let dir = path.shift();
    
    const subTree = data.tree.find((t) => t.path === dir);
    if (!subTree) {
        console.log('cannot find ', dir, 'in', data.tree, '(remaining: ', path, ')');
        return null;
    }
    
    return climbTree(path, subTree);
}

async function loadFiles() {
  if (lastLoadTime && lastLoadTime.diff(dayjs(), 'minutes') < 5) return files;
  
  const {data: branch} = await repo.getBranch('master');
  
  const {
    commit: {
        sha, 
        commit : {tree}
    }
  } = branch;
  
  const subTree = await climbTree('COVID-19_CLEAN/csse_covid_19_clean_data', tree);
  files = subTree.filter((t) => /^CSSE_DailyReports.*csv$/.test(t.path));
  lastLoadTime = dayjs();
  return files;
};

/* eslint-disable no-unused-vars */
exports.CsvFiles = class CsvFiles {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return await loadFiles();;
  }

  async get (id, params) {
    return files.find(file => file.path === id);
  }

  async create (data, params) {
    throw new Error('csv files cannot be created; load from server');

    return data;
  }

  async update (id, data, params) {
    throw new Error('csv files cannot be updated; load from server');
    return data;
  }

  async patch (id, data, params) {
    throw new Error('csv files cannot be patched; load from server');
    return data;
  }

  async remove (id, params) {
    throw new Error('csv files cannot be removed; load from server');
    return { id };
  }
};
