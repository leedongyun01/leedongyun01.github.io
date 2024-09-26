#include <iostream>
using namespace std;

class person {
	int no;
public:
	void setNo(int);
	int getNo();
};

void person::setNo(int p)
{
	no = p;
}

int person::getNo()
{
	return(no);
}

void main()
{
	person kim[100];
	person* p = kim;
	p->setNo(5);
	cout << p->getNo();
}