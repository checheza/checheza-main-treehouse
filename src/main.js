import { Widget } from 'checheza_core';
import Manifest from './manifest';
import MainDomain from './domains/main';
import CategoryDomain from './domains/category';
import ModulesDomain from './domains/modules';
import ModuleDomain from './domains/module';
import BookshelfDomain from './domains/bookshelf';
import BookDomain from './domains/book';

class Treehouse extends Widget {
    constructor() {
        super(Manifest);

        this.domains = { 
            "main": new MainDomain(this),
            "category": new CategoryDomain(this),
            "modules": new ModulesDomain(this),
            "module": new ModuleDomain(this),
            "bookshelf": new BookshelfDomain(this),
            "book": new BookDomain(this)
        }
    }
}

export default new Treehouse();
