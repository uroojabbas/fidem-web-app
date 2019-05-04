/**
* Checklist database, it can build a tree structured Json object.
* Each node in Json object represents a to-do item or a category.
* If a node is a category, it has children items and new items can be added under the category.
*/
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserRoleServiceService} from './user-role-service.service';
import {NotificationService} from '../common/notification.service';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}


@Injectable()
export class ChecklistDatabase {

  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor(private userRoleService: UserRoleServiceService,
              private notificationService: NotificationService) {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.

    this.userRoleService.getModulePermissionList().subscribe(resultSet => {const data = this.buildFileTree(resultSet, 0);

        // Notify the change.
        this.dataChange.next(data); },

      error => this.notificationService.showError(error));

  }


  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      console.log('permissiion object ' + JSON.stringify(obj));
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}
