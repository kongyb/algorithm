import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class BOJ2164 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        DoubleLinkedList<Integer> list = new DoubleLinkedList();
        for (int i=1; i<=N; i++) {
            list.addTail(i);
        }
        while (list.getLen() > 1) {
            list.popHead();
            list.addTail(list.popHead());
        }
        System.out.println(list.popHead());
        return;
    }

    private static class DoubleLinkedList<T> {
        ListNode<T> head;
        ListNode<T> tail;
        int len;

        DoubleLinkedList() {
            this.head = null;
            this.tail = null;
            this.len = 0;
        }

        void addHead(T val) {
            ListNode<T> node = new ListNode(val);
            if (this.len == 0) {
                this.head = node;
                this.tail = node;
                this.len++;
                return;
            }
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
            this.len++;
        }

        void addTail(T val) {
            ListNode<T> node = new ListNode(val);
            if (this.len == 0) {
                this.head = node;
                this.tail = node;
                this.len++;
                return;
            }
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
            this.len++;
        }

        T popHead() {
            if (this.len == 0) {
                return null;
            }
            ListNode<T> node = this.head;
            this.head = this.head.next;
            if (this.head == null) {
                this.tail = null;
            }
            else {
                this.head.prev = null;
            }
            this.len--;
            return node.val;
        }

        T popTail() {
            if (this.len == 0) {
                return null;
            }
            ListNode<T> node = this.tail;
            this.tail = this.tail.prev;
            if (this.tail == null) {
                this.head = null;
            }
            else {
                this.tail.next = null;
            }
            this.len--;
            return node.val;
        }

        int getLen() {
            return this.len;
        }

    }

    private static class ListNode<T> {
        T val;
        ListNode<T> prev;
        ListNode<T> next;

        ListNode(T val) {
            this.val = val;
            this.next = null;
            this.prev = null;
        }
    }
}
